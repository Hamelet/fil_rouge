import { Injectable, Output } from '@angular/core';
import { Comm } from '../model/com-model';

import { Subject } from 'rxjs';
import  DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';
import { Post } from '../model/posts.model';


// @Directive()
@Injectable({
  providedIn: 'root'
})

export class CommsService {

  @Output() coms: Comm[];
  comment:Post;
  comsSubject = new Subject<Comm[]>();

  constructor() {
    this.getComs();
   }

  emitComs(){
    this.comsSubject.next(this.coms);

  }

  saveComs(){   
    firebase.database().ref('/blog').set(this.comment.comment);

  }

  getComs(){
    firebase.database().ref('/comms')
      .on('value', (data: DataSnapshot)=>{
        this.coms = data.val() ? data.val() : [];

       this.emitComs();
      }
    );
  }

  getSingleCom(id: number){
    return new Promise(
      (resolve, reject)=>{
        firebase.database().ref('/blog/' + id).once('value').then(
          (data: DataSnapshot)=>{
            resolve(data.val());
          }, (error)=>{
            reject(error);
          }
        );
      }
    );
  }

  createNewCom(newCom: Comm){
    this.coms.push(newCom);
    this.saveComs();
    this.emitComs();
  }

  removeCom(comm: Comm){
    const commIndexToRemove = this.coms.findIndex(
      (commEl)=>{
        if (commEl === comm) {
          return true;
        }
      }
    );
    this.coms.splice(commIndexToRemove, 1);
    this.saveComs();
    this.emitComs();
  }
}