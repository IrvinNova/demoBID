import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {

  public undo: boolean = true;
  public background: boolean = false;

  //@ViewChild('myCanvas') canvas: any;

  canvasElement: any;
  lastX: number;
  lastY: number;

  currentColour: string = '#000';
  brushSize: number = 2;

  constructor(public platform: Platform, public renderer: Renderer) {
      console.log('Hello CanvasDraw Component');
  }

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  ngAfterViewInit(){

      //this.canvasElement = this.canvas.nativeElement;

      this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
      this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');

  }

  handleStart(ev){

      this.lastX = ev.touches[0].pageX;
      this.lastY = ev.touches[0].pageY;
  }

  handleMove(ev){

      let ctx = this.canvasElement.getContext('2d');
      let currentX = ev.touches[0].pageX;
      let currentY = ev.touches[0].pageY;

      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(currentX, currentY);
      ctx.closePath();
      ctx.strokeStyle = this.currentColour;
      ctx.lineWidth = this.brushSize;
      ctx.stroke();       

      this.lastX = currentX;
      this.lastY = currentY;

  }

  clearCanvas(){
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);   
  }

}
