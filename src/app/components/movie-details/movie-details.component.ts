import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute , Params} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { AppMovieDialogComponent } from '../movie-details/app-movie-dialog/app-movie-dialog.component';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  public id: number;
  public video: boolean;
  movie: any;
  baseUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  relatedvideo: any;
  casts: any = [];
  backdrops: any = [];
  recomendMovies: any = [];
  responsiveOptions;
  isInPersonal:boolean = true;
  retriveResultsCount = 0;
  subscription: Subscription;
  resultadoDeBusquedaAmule:[]=[];
  constructor(
    private movieService: MoviesService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
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
  ];
  }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getCookies();
      this.getSingleMoviesVideos(this.id);
      this.getSingleMoviesDetails(this.id);
      this.getCast(this.id);
      this.getBackropsImages(this.id);
      this.getRecomendMovie(this.id);
      this.isregistrarEnPersonal(this.id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getCookies(){
    this.movieService.getCookies().subscribe((res:any)=>{
      console.log(res)
    });
  }

  buscarEnAmule():void{
    this.movieService.searchInAmule(this.movie.title).subscribe((res:any)=>{
      console.log(res)
      const source = interval(10000);
      this.subscription = source.subscribe(val => this.recuperarResultadosEnAmule());

    });
  }
  recuperarResultadosEnAmule():any{
    this.movieService.getSearchResultsAmule().subscribe((res:any)=>{
      this.retriveResultsCount+=1;
      if(this.retriveResultsCount>=5){
        this.subscription.unsubscribe();
      }
      console.log(res);
      this.resultadoDeBusquedaAmule=res;
    });
  }

  getSingleMoviesDetails(id){
    this.movieService.getMovie(id).subscribe((res: any) => {
      this.movie = res;
      console.log(this.movie);
    });
  }

  getSingleMoviesVideos(id) {
    this.movieService.getMovieVideos(id).subscribe((res: any) => {
      if (res.results.length) {
        this.video = res.results[0];
        this.relatedvideo = res.results;
      }
    });
  }

  openDialogMovie(video): void {
    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + video.key + this.autoplay); 
    this.dialog.open(AppMovieDialogComponent, {
      height: '600px',
      width: '900px',
      data: { video: this.video}
    });
  }

  isregistrarEnPersonal(id): void {
    this.movieService.isRegisteredInPersonal(id).subscribe((res: any) => {
      if(res.result == "Movie not found"){
        this.isInPersonal = false;
      }
    });;
  }
  registrarEnPersonal(): void {
    this.movieService.saveMovieInPersonal(this.movie.id,this.movie.title,JSON.stringify(this.movie)).subscribe((res: any) => {
      console.log(res);
      console.log(res.status);
      if(res.result != "Error"){
        this.isInPersonal = true;
      }
    });;
  }

  
  getCast(id) {
    this.movieService.getMovieCredits(id).subscribe((res: any) => {
      this.casts = res.cast;
    });
  }

  getBackropsImages(id) {
    this.movieService.getBackdropsImages(id).subscribe((res: any) => {
      this.backdrops = res.backdrops;
    });
  }

  getRecomendMovie(id) {
    this.movieService.getRecomendMovies(id).subscribe((res: any) => {
      this.recomendMovies = res.results;
    });
  }
 
}

