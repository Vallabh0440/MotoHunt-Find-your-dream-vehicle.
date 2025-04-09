import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';
import { provideHttpClient } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { MenuModule } from '@syncfusion/ej2-angular-navigations';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCekx0QXxbf1x1ZFREal5YTnNaUiweQnxTdEBjWn1WcHVWQWFdWUJ/WElfag==");

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
});
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));