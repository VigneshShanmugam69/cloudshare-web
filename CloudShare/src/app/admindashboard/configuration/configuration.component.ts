import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {

  configureurl = new FormGroup({
    acsurl: new FormControl(""),
    issuer: new FormControl(""),
    metadata: new FormControl(""),
    embed: new FormControl("")
  })


  saveconfig(){
    let payload={
      acs:this.configureurl.controls.acsurl.value,
      issuer:this.configureurl.controls.issuer.value,
      metadata:this.configureurl.controls.metadata.value,
      embed:this.configureurl.controls.embed.value,
    }
    console.log(payload)
  }

}
