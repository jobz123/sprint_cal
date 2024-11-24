import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sprint-cal',
  templateUrl: './sprint-cal.component.html',
  styleUrls: ['./sprint-cal.component.scss']
})
export class SprintCalComponent {

  sprintCalForm!: FormGroup;
  invalidSprintForm: boolean = false;
  storyList: any = [];
  selectedStories: any = [];
  title: any;

  constructor(
    private fb: FormBuilder,
    private toasterService: ToastrService
  ) {
    this.storyList = JSON.parse(localStorage.getItem('stories') || '[]');
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.sprintCalForm = this.fb.group({
      sprintName: ['', Validators.required],
      sprintPoint: ['', [Validators.required, Validators.min(1)]],
    })
  }

  onClickGenerateSprint() {
    this.invalidSprintForm = !this.sprintCalForm.valid;
    if (this.sprintCalForm.valid) {
      this.title = this.sprintCalForm.value.sprintName
      if (this.storyList.length === 0) {
        this.toasterService.error('No Stories Available to Select.');
        return;
      }
      const storiesCopy = [...this.storyList];
      // this.selectedStories = [];
      // let totalPoints = 0;

      // storiesCopy.sort((a, b) => a.points - b.points);
      // for (const story of storiesCopy) {
      //   if (totalPoints + story.storyPoint <= this.sprintCalForm.value.sprintPoint) {
      //     this.selectedStories.push(story);
      //     totalPoints += story.storyPoint;
      //   }
      // }

      let bestCombination: any[] = [];
      let maxPoints = 0;

      const findCombinations = (index: number, selected: any[], totalPoints: number) => {
        if (totalPoints > this.sprintCalForm.value.sprintPoint) return;
        if (totalPoints > maxPoints) {
          maxPoints = totalPoints;
          bestCombination = [...selected];
        }

        for (let i = index; i < storiesCopy.length; i++) {
          findCombinations(i + 1, [...selected, storiesCopy[i]], totalPoints + storiesCopy[i].storyPoint);
        }
      };
      findCombinations(0, [], 0);
      this.selectedStories = bestCombination;

      if (this.selectedStories.length === 0) {
        this.toasterService.error('No Stories Found for the Given Sprint Point.');
        this.selectedStories = [];
        this.title = '';
        return;
      }
    }
  }

  onClickClearStories() {
    localStorage.clear();
    this.storyList = [];
    this.onClickSelectedStory();
  }

  onClickSelectedStory() {
    this.selectedStories = [];
    this.sprintCalForm.reset();
    this.title = '';
  }
  

}
