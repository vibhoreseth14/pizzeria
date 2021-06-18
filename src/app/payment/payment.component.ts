import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PizzaDbService } from '../pizza-db.service';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from '@stripe/stripe-js';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

   am=0;
   name="John Doe";
   parsedam=0;
  constructor(
    private http: HttpClient,
    private stripeService: StripeService,
    private pserv:PizzaDbService
  ) {}

  ngOnInit(): void {
    this.am=this.pserv.totalcost;
    this.parsedam=this.am*100;
  }

  pay(): void {
      this.createPaymentIntent(this.parsedam)
        .pipe(
          switchMap((pi) =>
            this.stripeService.confirmCardPayment(pi.client_secret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.name,
                },
              },
            })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              alert("Payment processed!");
            }
          }
        });
   
  }

  createPaymentIntent(amount:any): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>("http://localhost:3000/create-payment-intent",{amount:amount});
  }
}


