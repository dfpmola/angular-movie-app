import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  responsiveOptions;
  loader = true;
  totalResults = [];
  searchRes:any;
  resultado = [];
  constructor(private movieService: MoviesService) {
    this.responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]; }

ngOnInit() {
  this.getMoviesPersonal(1);
}

getMoviesPersonal(page: number) {
  this.movieService.getAllInPersonal().pipe(delay(2000)).subscribe((res: any) => {
    console.log(res);
    
    for (let index = 0; index < res.length; index++) {
      const movie = res[index].data;
      this.resultado.push(JSON.parse(movie));
    }
    this.totalResults = res.length;
    this.searchRes=true;
    this.loader = false;
  },
  error => console.log(error));
}

}
