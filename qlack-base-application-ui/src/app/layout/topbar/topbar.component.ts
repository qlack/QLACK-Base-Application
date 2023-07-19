import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppConstants} from "../../app.constants";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html"
})
export class TopbarComponent implements OnInit {
  form!: FormGroup;
  themes = ["acid", "aqua", "autumn", "black", "bumblebee", "business", "cmyk", "coffee", "corporate", "cupcake", "cyberpunk", "dark", "dracula", "emerald", "fantasy", "forest", "garden", "halloween", "lemonade", "light", "lofi", "luxury", "night", "pastel", "retro", "synthwave", "valentine", "winter", "wireframe"];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // Set up the form.
    this.form = this.fb.group({
      searchTerm: []
    });
  }

  closeSearchResults() {
    this.form.controls.searchTerm.setValue("");
  }

  selectTheme(name: string) {
    // Change the theme.
    document.querySelector("html")!.setAttribute("data-theme", name);

    // Save the selection in local storage.
    localStorage.setItem(AppConstants.LOCAL_STORAGE_THEME, name);
  }
}
