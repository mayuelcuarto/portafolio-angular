import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
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
  public url?: string;
   
  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = "Editar Proyecto";
    this.url = Global.url;
  }

  ngOnInit(){
    this._route.params.subscribe(
      params => {
        let id = params['id'];
        this.getProject(id);
      }
    );
  }

  getProject(id: string){
    this._projectService.getProject(id).subscribe({
      next: (response) => {
        this.project = response.project;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSubmit(form: NgForm){
    // Guardar datos basicos
    this._projectService.updateProject(this.project).subscribe({
      next: (response) => {
        if (response.project) {
          // Subir la imagen
          if(this.filesToUpload.length >= 1){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
            .then((result:any) => {
              this.status = 'success';
              this.saveProject = result.project;
            });
          }else{
            this.status = 'success';
            this.saveProject = response.project;
          }
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
