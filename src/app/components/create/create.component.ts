import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [ProjectService]
})
export class CreateComponent {
  public title?: string;
  public project: Project = {
    _id: '',
    name: '',
    description: '',
    category: '',
    year: 2025,
    langs: '',
    image: ''
  };
  public status?: string;
   
  constructor(
    private _projectService: ProjectService
  ) {
    this.title = "Crear Proyecto";
  }

  onSubmit(form: NgForm){
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if(response.project){
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error)
      }
    )
  }
}
