import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';
// import { provideHttpClient } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { MenuModule } from '@syncfusion/ej2-angular-navigations';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCe0x0QXxbf1x1ZFRMYVpbRnVPIiBoS35Rc0VnW3tfc3VTRGVfWUdzVEBU");

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)
);