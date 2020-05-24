import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/posts.model';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.postForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['']
    })
  }

  onSavePost(){
    const name = this.postForm.get('name').value;
    console.log(name);
    const text = this.postForm.get('message').value;
    console.log(text);

    const newPost = new Post(name, text);
    newPost.text = text;

    this.postsService.createNewPost(newPost);
    this.router.navigate(['/blog']);

  };



}
