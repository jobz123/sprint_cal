import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.scss']
})
export class AddStoryComponent {

  storyForm!: FormGroup;
  invalidStoryForm: boolean = false;
  storyList: any = [];

  constructor(
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private el: ElementRef
  ) {
    this.initForm();
  }

  initForm() {
    this.storyForm = this.fb.group({
      storyName: ['', Validators.required],
      storyPoint: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      storyDescription: ['']
    })
    this.getStories();
  }

  getStories() {
    this.storyList = JSON.parse(localStorage.getItem('stories') || '[]');
  }

  onClickAddStory() {
    this.invalidStoryForm = !this.storyForm.valid;
    if (this.storyForm.valid) {
      const existingStory = this.storyList.find((item: { storyName: any; }) => item.storyName.toLowerCase() === this.storyForm.value.storyName.toLowerCase());
      if (existingStory) {
        this.toasterService.error('Please try in another story name.')
        return;
      }
      this.storyList.push(this.storyForm.value);
      localStorage.setItem('stories', JSON.stringify(this.storyList));
      this.storyForm.reset();
      this.toasterService.success('Story added successfully.');
    } else {
      const target = this.el.nativeElement.querySelector('.ng-invalid:not(form):not(div)');
      if (target) {
        target.focus();
      }
    }
  }
}
