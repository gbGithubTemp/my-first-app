import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/Services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  public propertyId: number = 0;
  property = new Property();
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private housingService: HousingService) { }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];

    this.route.data.subscribe(
      (data: Property) => {
        this.property = data['prp'];
      }
    );

    // this.route.params.subscribe(
    //   (params) => {
    //     this.propertyId = +params['id'];
    //     this.housingService.getProperty(this.propertyId).subscribe(
    //       (data: Property) => {
    //         this.property = data;
    //       }, error => this.router.navigate(['/'])
    //     );
    //   }
    // );

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }
      // // max-width 800
      // {
      //   breakpoint: 800,
      //   width: '100%',
      //   height: '600px',
      //   imagePercent: 80,
      //   thumbnailsPercent: 20,
      //   thumbnailsMargin: 20,
      //   thumbnailMargin: 20
      // },
      // // max-width 400
      // {
      //   breakpoint: 400,
      //   preview: false
      // }
    ];

    this.galleryImages = [
      {
        small: 'assets/Images/prop-1.jpg',
        medium: 'assets/Images/prop-1.jpg',
        big: 'assets/Images/prop-1.jpg'
      },
      {
        small: 'assets/Images/prop-2.jpg',
        medium: 'assets/Images/prop-2.jpg',
        big: 'assets/Images/prop-2.jpg'
      },
      {
        small: 'assets/Images/prop-3.jpg',
        medium: 'assets/Images/prop-3.jpg',
        big: 'assets/Images/prop-3.jpg'
      },{
        small: 'assets/Images/prop-4.jpg',
        medium: 'assets/Images/prop-4.jpg',
        big: 'assets/Images/prop-4.jpg'
      },
      {
        small: 'assets/Images/prop-5.jpg',
        medium: 'assets/Images/prop-5.jpg',
        big: 'assets/Images/prop-5.jpg'
      }
    ];
  }
}
