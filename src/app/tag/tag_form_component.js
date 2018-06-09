import app from "../app";
import TagFormView from './tag_form.html'

function TagFormComponent() {}
app.component("tag-form", {
  template: TagFormView,
  controller: TagFormComponent
});
