import { Component, Input } from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';

@Component({
  selector: 'app-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.css']
})
export class UploadBoxComponent {

  constructor(private localService: LocalisationService) {}

  @Input() title!: string;

  uploadCaption = this.localService.publish.step5_caption_upload;
  uploadSvg = this.localService.images.publish.uploadSvg;

}
