import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
export interface IBike {
  id: number;
  image: string;
  description: string;
  price: number;
  quantity: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  bikes;
  nameParams = '';
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {

    const savedBikes = JSON.parse(localStorage.getItem('bikes'));
    if (savedBikes && savedBikes.length > 0) {
      this.bikes = savedBikes;

    } else {
      this.bikes = await this.loadBikesFromFile();
    }
  } async loadBikesFromFile() {
    const bikes = await this.http.get('assets/bikes.json').toPromise();
    return bikes.json();
  }

  addBike() {
    this.toastService.showToast('success', 2000, 'Bike added');
    const newBike: IBike = {
      'id': null,
      'image': null,
      'description': null,
      'price': null,
      'quantity': null
    };
    this.bikes.unshift(newBike);
    this.saveToLocalStorage('bikes', this.bikes);
  }
  saveToLocalStorage(key: string, data: Array<IBike>) {
    this.saveToLocalStorage(key, data);

  }
  deleteBike(index: number) {
    this.toastService.showToast('warning', 2000, "Bike removed");
    this.bikes.splice(index, 1);
    this.saveToLocalStorage('bikes', this.bikes);
  }
  finalize() {
    const data = this.compute();
    this.router.navigate(['invoice', data]);
  }
  compute() {
    if(this.nameParams == null || this.nameParams === '') {
      this.toastService.showToast('warning',2000, 'Name must be defined');
      } else if(this.nameParams.indexOf(',') === -1)  {
      this.toastService.showToast('warning',2000,'Name must be defined');}
      else {
    let quantity = 0;
    let price = 0;
    for (let i = 0; i < this.bikes.length; i++){
      price += this.bikes[i].price;
      quantity += this.bikes[i].quantity;
    }
     return {fullName: fullName,
     subTotal: (price * quantity),
     tax: (price*quantity*.15),
     total: (price*quantity*.15) + (price*quantity)

    }}
  
  
  }
  save(){
    this.toastService.showToast('success',2000,"Saved successfully");
  }
  }
  


}
} 
}