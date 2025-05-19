import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PromptTechnique } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SimulatorComponent } from './components/simulator/simulator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, SidebarComponent, SimulatorComponent],
})
export class AppComponent {
  selectedTechnique: PromptTechnique = 'zero-shot';
  temperature: number = 0;
}
