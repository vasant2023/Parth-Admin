import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminServiceService } from 'src/app/admin-service.service';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-hardware-create',
  templateUrl: './hardware-create.component.html',
  styleUrls: ['./hardware-create.component.css']
})
export class HardwareCreateComponent implements OnInit {

  hardwareObj: any = {
    hardware: "",
    image: "",
    description: "",
    status: "",
    brand_ID: "",
    color_code: "",
    weight: "",
    stock: "",
    price: "",
  }

  configEditor = {
    removeButtons: 'Print,Preview,NewPage,Source,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Checkbox,TextField,Textarea,Radio,Form,Select,Button,ImageButton,HiddenField,Replace,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About,FontSize,Image',
    toolbarGroups: [
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'styles', groups: ['styles'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks'] },
      '/',
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'paragraph', groups: ['align', 'bidi', 'paragraph'] },
      { name: 'forms', groups: ['forms'] },
      { name: 'links', groups: ['links'] },
      { name: 'colors', groups: ['colors'] },
      { name: 'insert', groups: ['insert'] },
      '/',
      { name: 'tools', groups: ['tools'] },
      { name: 'others', groups: ['others'] },
      { name: 'about', groups: ['about'] }
    ]
  }

  public isLoading:boolean = false

  hardware_ID = ""

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public adminService: AdminServiceService,
  ) { }

  createHarwareform: FormGroup;


  ngOnInit() {
    this.gethardwareID();
    this.hardwareDetails();
  }

  public onChange({ editor }: ChangeEvent) {
    this.hardwareObj.description = editor.getData();
  }

  handleInputChange(event) {
    this.hardwareObj.image = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.hardwareObj.image_view = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  gethardwareID() {
    this.hardware_ID = this.route.snapshot.params['hardware_ID'] ? this.route.snapshot.params['hardware_ID'] : "";
  }

  hardwareDetails() {
    this.adminService.hardwareDetails(this.hardware_ID).subscribe((response: { success: number, message: string, hardware: [] }) => {
      if (response.success == 1) {
        this.hardwareObj = response.hardware;
      }
    })
  }

  submitHardware() {

    if (this.isLoading == false) {
      this.isLoading = true
      if (this.hardware_ID) {
        let formData = new FormData();
        formData.append('apiId', environment.apiId);
        formData.append('from_app', "true");
        formData.append('hardware', this.hardwareObj.hardware);
        formData.append('status', this.hardwareObj.status);
        formData.append('brand_ID', this.hardwareObj.brand_ID);
        formData.append('color_code', this.hardwareObj.color_code);
        formData.append('weight', this.hardwareObj.weight);
        formData.append('stock', this.hardwareObj.stock);
        formData.append('price', this.hardwareObj.price);
        formData.append('description', this.hardwareObj.description);
        formData.append('hardware_ID', this.hardwareObj.hardware_ID);
        formData.append('image', this.hardwareObj.image);
        this.adminService.updateHardware(formData).subscribe((response: { success: number, message: string }) => {
          if (response.success == 1) {
            this.router.navigate(['admin/hardwares']);
          }
          this.isLoading = false;

        })
      } else {
        let formData = new FormData();
        formData.append('apiId', environment.apiId);
        formData.append('from_app', "true");
        formData.append('hardware', this.hardwareObj.hardware);
        formData.append('status', this.hardwareObj.status);
        formData.append('brand_ID', this.hardwareObj.brand_ID);
        formData.append('color_code', this.hardwareObj.color_code);
        formData.append('weight', this.hardwareObj.weight);
        formData.append('stock', this.hardwareObj.stock);
        formData.append('price', this.hardwareObj.price);
        formData.append('description', this.hardwareObj.description);
        formData.append('image', this.hardwareObj.image, this.hardwareObj.image.name);
        this.adminService.createHardware(formData).subscribe((response: { success: number, message: string }) => {
          if (response.success == 1) {
            this.router.navigate(['admin/hardwares']);
          }
          this.isLoading = false;

        })
      }
    }

  }

}
