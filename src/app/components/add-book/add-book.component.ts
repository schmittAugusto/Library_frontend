import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book.model';
import { Genre } from 'src/app/models/genres.model';
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  book: Book = {
    title: '',
    author: '',
    year: 0,
    genres: '',
    ISBN: 0,
    availability: undefined,
    publisher: '',
  };

  submitted = false;

  genres: Genre[] = [];

  constructor(
    private bookService: BookService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.genreService.getAll().subscribe((genres) => {
      this.genres = genres;
    });
  }

  saveBook(): void {
    const data = {
      title: this.book.title,
      author: this.book.author,
      year: this.book.year,
      genres: this.book.genres,
      ISBN: this.book.ISBN,
      availability: this.book.availability,
      publisher: this.book.publisher,
    };

    this.bookService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  newBook(): void {
    this.submitted = false;
    this.book = {
      title: '',
      author: '',
      year: 0,
      genres: '',
      ISBN: 0,
      availability: undefined,
      publisher: '',
    };
  }
}
