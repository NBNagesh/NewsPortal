import { CommonService } from './common.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Article';
  allArticle:any=[];
  isEdit = false;
  p:any;
  filteredString:string='';
  successmessage:boolean=false;
  deletemessage:boolean=false;
  articleObj = {
    title: '',
    description: '',
    category: '',
    createdDT: '',
    id: ''
  };
  constructor(private commonService: CommonService) {}
  ngOnInit(): void {
    this.getLatestArticle();
  }
  addArticle(formObj: any) {
    console.log(formObj);
    this.commonService.createArticle(formObj).subscribe((response) => {
      if(response){
        this.getLatestArticle();
        this.successmessage=true;
        this.articleObj.title='';
        this.articleObj.category='';;
        this.articleObj.description='';
        this.articleObj.createdDT='';
      }
    },(error) => {
      console.log(error);
      this.successmessage = false;
    });
  }
  getLatestArticle() {
    this.commonService.getAllArticles().subscribe((response) => {
      this.allArticle = response;
    });
  }
  editArticle(article: any) {
    this.isEdit = true;
    this.articleObj = article;
  }
  deleteArticle(article: any) {
    this.commonService.deleteArticle(article).subscribe((response) => {
      if(response){
        this.getLatestArticle();
        this.deletemessage=true;
      }
    },(error) => {
      console.log(error);
      this.deletemessage = false;
    });
  }
  updateArticle() {
    this.isEdit = !this.isEdit;
    this.commonService.updateArticle(this.articleObj).subscribe((response) => {
      if(response){
        this.getLatestArticle();
        this.successmessage=true;
      }
    },(error) => {
      console.log(error);
      this.successmessage = false;
    });
  }
  removeMessage(){
    this.successmessage=false;
    this.deletemessage=false;
  }
}
