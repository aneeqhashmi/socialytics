import { Component, Inject, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatePipe } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { validateArgCount } from '@firebase/util/dist/esm/src/validation';
import { forEach } from '@firebase/util/dist/esm/src/obj';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  
  @ViewChild('entity') entity; 
  @ViewChild('text') text;
  @ViewChild('chart') chart;
  dataSource: Object;
  dummydata = [
    'Very satisfying to see that PTI followers are ideological.V sometimes compromise a bit but cant stay quiet on such blunders. None other has the same courage. #ImranKhan and Na Ahal Karachi leadership has to answer this. #KickOutAamir . Speak up @FaisalJavedKhan @FaisalVawdaPTI',
    "Nawaz Sharif shb ap jalsso me to kise sheeshy cabin K peechy chupp k safely speech kr skty hy but infront of people without any cabin you don't be safe ye to #ImranKhan Shb hy jo bgaair durry Karachi ke lift py logon se khitaab krty",
    "#ImranKhan & #NawazSharif launched #MetroBus service @ cost of seven to four times higher than similar project in neighbouring country India i.e. Amritsar. Per kilometer cost in millions:",
    "Aap #PTI Ko Ya #ImranKhan Ko support ker Kay Party pe koi Ahsan Nahi ker rahe hain. You don't like IK's decision just go & fly a kite. Party isn't there to see the sentiments of 200m ppl isn't hurt on every single decision Party makes. Twitter polls are simply BS. So STFU please.",
    "Bhai we do acknowledge his efforts, i always loved him. But #ImranKhan needs us more then ever. We cannot abandon him.",
    "Only if #ImranKhan can realise how many sincere friends he has lost just for that one lunatic from Karachi"
  ];
  

  constructor(private afAuth: AngularFireAuth, 
              private af: AngularFireDatabase,
              private route: ActivatedRoute) {
      
      
  }

  ngOnInit() {
    
    this.getData(this.entity.nativeElement.value);
    // this.repeatposting();
  }

  repeatposting(){
    setTimeout(() => {
      if(this.dummydata.length > 0){
        this.submit(this.dummydata.pop(),"Imran Khan");
        this.repeatposting();
      }
   }, 2000);
  }

  submit(text, entity){
    const data = {
      text: text == undefined ? this.text.nativeElement.value : text,
      entity: entity == undefined ? this.entity.nativeElement.value: entity,
    };
    // console.log(data);
    this.af.list('sentences').push(data);
    this.text.nativeElement.value = '';
    this.getData(this.entity.nativeElement.value);
  }


  getData(entity){
    // console.log(entity);
    this.af.list('entities/'+entity).valueChanges().subscribe(sentiments=>{
      var category = [];
      var data = [];
      // console.log(sentiments);
      if(sentiments.length == 0){
        category.push({});
        data.push({});
      }
      var count = 0;
      console.log(sentiments.length);
      Object.keys(sentiments).forEach(key => {
        // console.log(sentiments[key]);
        const sentiment = sentiments[key].sentiment;
        const score = sentiment.words ? sentiment.score/sentiment.words.length : 0;
        const time = sentiments[key].created;
        // if(count >= 1){
          const d = Date();
          var datePipe = new DatePipe("en-US");
          category.push({"label":datePipe.transform(d, 'dd/MM/yyyy')});
        //    count = 0;
        // } else {
        //   count++;
        //   category.push({"label":""});
        // }
        data.push({"value": score});
      }); 
      this.plotData(entity,category, data);
      
    });

    
  }

  plotData(entity, category, data){
    
    this.dataSource = {
      "chart": {
          "caption": "Sentiments",
          "subcaption": "Last year",
          "xaxisname": "Time",
          "yaxisname": "Sentiment Index",
          "theme": "ocean",
      },
      "categories": [
          {
              "category": category
          }
      ],
      "dataset": [
          {
              "seriesname": entity,
              "renderas": "line",
              "showvalues": "0",
              "data": data
          }
      ]
    };
  }

}

