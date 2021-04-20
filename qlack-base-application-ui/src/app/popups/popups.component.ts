import {Component, OnInit} from '@angular/core';
import {UtilityService} from "../shared/service/utility.service";
import {MatDialog} from "@angular/material/dialog";
import {OkCancelModalComponent} from "../shared/component/display/ok-cancel-modal/ok-cancel-modal.component";
import {TextModalComponent} from "../shared/component/display/text-modal/text-modal.component";

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.scss']
})
export class PopupsComponent implements OnInit {

  constructor(private utilityService: UtilityService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  success() {
    this.utilityService.popupSuccess("Your action was successful.");
  }

  info() {
    this.utilityService.popupInfo("Your action is scheduled.");
  }

  error() {
    this.utilityService.popupError("There was a problem completing your action.");
  }

  okCancel() {
    this.dialog.open(OkCancelModalComponent, {
      data: {
        title: 'Permanently deleting record',
        question: 'Do you really want to delete this record?',
        buttons: {
          ok: true, cancel: true, reload: false
        }
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.utilityService.popupSuccess("Record has been deleted.");
      } else {
        this.utilityService.popupInfo("Record deletion canceled.");
      }
    });
  }

  text() {
    this.dialog.open(TextModalComponent, {
      data: {
        title: 'Some text output',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod efficitur ornare. Cras sit amet neque in ipsum dictum posuere vel vel ipsum. Nulla tristique posuere massa vehicula condimentum. Morbi a eleifend est. Aenean id justo sit amet eros blandit suscipit. Phasellus non odio diam. Phasellus tincidunt, est eget rutrum accumsan, tortor urna congue quam, interdum finibus magna felis id magna. Donec lobortis ex sed mattis aliquam.'
      }
    });
  }
}
