import { Component } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
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
  }
   
  constructor(
    private _projectService: ProjectService
  ) {
    this.title = "Crear Proyecto";
  }

  onSubmit(form?:Form){
    console.log(this.project);
  }
}
