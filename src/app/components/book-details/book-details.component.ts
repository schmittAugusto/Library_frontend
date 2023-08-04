import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service'; //auth
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentBook: Book = {
    title: '',
    author: '',
    year: 0,
    genres: '',
    ISBN: 0,
    availability: undefined,
    publisher: '',
  };

  message = '';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getBook(this.route.snapshot.params['id']);
    }
    this.isLoggedIn = this.storageService.isLoggedIn(); //aunth

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      //this.username = user.username;
    }
  }

  getBook(id: string): void {
    this.bookService.get(id).subscribe({
      next: (data) => {
        this.currentBook = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  updatePublished(status: boolean): void {
    const data = {
      title: this.currentBook.title,
      author: this.currentBook.author,
      year: this.currentBook.year,
      genres: this.currentBook.genres,
      ISBN: this.currentBook.ISBN,
      availability: status,
      publisher: this.currentBook.publisher,
    };

    this.message = '';

    this.bookService.update(this.currentBook.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentBook.availability = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  updateBook(): void {
    this.message = '';
    this.bookService.update(this.currentBook.id, this.currentBook).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This book was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  deleteBook(): void {
    this.bookService.delete(this.currentBook.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/books']);
      },
      error: (e) => console.error(e),
    });
  }
}
