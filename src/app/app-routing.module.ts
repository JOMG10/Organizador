import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'formulario',
    loadChildren: () => import('./formulario/formulario.module').then( m => m.FormularioPageModule)
  },
  {
    path: 'lista',
    loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'tab02',
    loadChildren: () => import('./tab02/tab02.module').then( m => m.Tab02PageModule)
  },
  {
    path: 'contenido',
    loadChildren: () => import('./contenido/contenido.module').then( m => m.ContenidoPageModule)
  },
  {
    path: 'asandalias',
    loadChildren: () => import('./asandalias/asandalias.module').then( m => m.AsandaliasPageModule)
  },
  {
    path: 'azapatos',
    loadChildren: () => import('./azapatos/azapatos.module').then( m => m.AzapatosPageModule)
  },
  {
    path: 'accesorios',
    loadChildren: () => import('./accesorios/accesorios.module').then( m => m.AccesoriosPageModule)
  },  {
    path: 'atenis',
    loadChildren: () => import('./atenis/atenis.module').then( m => m.AtenisPageModule)
  }





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
