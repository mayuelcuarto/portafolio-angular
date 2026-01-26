import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [ProjectService, UploadService]
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
  public saveProject?: Project;
  public status?: string;
  public filesToUpload: Array<File> = [];
   
  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear Proyecto";
  }

  onSubmit(form: NgForm){
    // Guardar datos basicos
    this._projectService.saveProject(this.project).subscribe({
      next: (response) => {
        if (response.project) {
          // Subir la imagen
          this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
          .then((result:any) => {
            this.status = 'success';
            this.saveProject = result.project;
            form.reset();
          });
        } else {
          this.status = 'failed';
        }
      },
      error: (err) => {
        console.error(err);
        this.status = 'failed';
      }
    });
  }

  fileChangeEvent(fielInput:any){
    this.filesToUpload = <Array<File>>fielInput.target.files;
  }
}
