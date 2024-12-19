import { TestBed } from "@angular/core/testing";
import { ApiService } from "./api.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpErrorResponse } from "@angular/common/http";

interface TagInterface {
    id: number;
    name: string;
}

describe('ApiService', () => {
    let apiService: ApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });

        apiService = TestBed.inject(ApiService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify(); // biztosítja, hogy semmi fennmaradó kérés sincs függőben
    });

    it('creates service', () => {
        expect(apiService).toBeTruthy();
    });

    describe('getTags', () => {
        it('should return a list of tags', () => {
            let tags: TagInterface[] | undefined;
            apiService.getTags().subscribe(response => { // async folyamat
                tags = response;
            });
            const req = httpTestingController.expectOne('http://localhost:3004/tags'); // egy request-et várunk
            req.flush([{ id: 1, name: 'foo' }]); // itt bármilyen response-t megadhatunk
            expect(tags).toEqual([{ id: 1, name: 'foo' }]);
        })
    });

    describe('createTag', () => {
        it('should create a tag', () => {
            let tag: TagInterface | undefined;
            apiService.createTag('boo').subscribe(response => {
                tag = response;
            });
            const req = httpTestingController.expectOne('http://localhost:3004/tags'); // egy request-et várunk
            req.flush({ id: 1, name: 'boo' });
            expect(tag).toEqual({ id: 1, name: 'boo' });
        });

        it('should pass the correct body', () => {
            let tag: TagInterface | undefined;
            apiService.createTag('boo').subscribe(response => {
                tag = response;
            });
            const req = httpTestingController.expectOne('http://localhost:3004/tags'); // egy request-et várunk
            req.flush({ id: 1, name: 'boo' });
            expect(req.request.method).toEqual('POST');
            expect(req.request.body).toEqual({ name: 'boo' });
            // expect(req.request.body).toEqual({ id: 1, name: 'boo' }); // fail, mert id-t nem küldünk: this.httpClient.post<TagInterface>(`${this.apiUrl}/tags`, { name });
        });

        it('should throw an error if request fails', () => {
            let actualError: HttpErrorResponse | undefined;

            apiService.createTag('boo').subscribe({
                next: _ => { // alulvonással jelezhetjük, hogy az objektumot nem fogjuk használni, a paraméter nem fontos
                    fail('You shall never PASS here'); // explicit módon megmondjuk, hogy a tesztnek fail az eredménye
                },
                error: (err) => {
                    actualError = err;
                }
            });

            const req = httpTestingController.expectOne('http://localhost:3004/tags'); // egy request-et várunk
            req.flush('Server error', { status: 422, statusText: 'Unprocessable entity' });

            if (!actualError) { // arra szolgál, hogy biztosítva legyen, hogy a tesztben tényleg hibát kaptunk, amikor a createTag metódust hívjuk
                throw new Error('Error needs to be defined');
            }

            expect(actualError.status).toEqual(422);
            expect(actualError.statusText).toEqual('Unprocessable entity');
        });
    });
})