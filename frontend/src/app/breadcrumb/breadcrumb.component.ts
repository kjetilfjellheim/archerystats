import { Component, OnInit }            from '@angular/core';
import { Router, NavigationEnd }        from "@angular/router";
import 'rxjs/add/operator/filter';

import { Breadcrumb }                   from './breadcrumb';

@Component({
    selector: 'breadcrumbComponent',
    templateUrl: './breadcrumb.html',
    styleUrls: ['./breadcrumb.css']
})
export class BreadcrumbComponent implements OnInit {

    breadcrumbs : Breadcrumb[];

    constructor(private router: Router) {
        this.breadcrumbs = [ ];
    }

    ngOnInit(): void {
        this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(function(event: NavigationEnd) {
                this.breadcrumbs = this.getBreadCrumbs(event);
            }.bind(this));
    }


    private getBreadCrumbs(event : NavigationEnd) : Breadcrumb[] {
        let breadcrumbs = event.urlAfterRedirects.split("/");
        let newBreadcrumbs : Breadcrumb[] = [ this.getBreadCrumb("/", "Hjem") ];
        let url : string = "";
        for(var breadcrumbStr of breadcrumbs) {
            if (breadcrumbStr !== '') {
                breadcrumbStr = decodeURIComponent(breadcrumbStr);
                url = url.concat("/").concat(breadcrumbStr);
                newBreadcrumbs.push(this.getBreadCrumb(url, breadcrumbStr));
            }
        }
        return newBreadcrumbs;
    }

    private getBreadCrumb(url : string, name : string) : Breadcrumb {
        let breadcrumb = new Breadcrumb();
        breadcrumb.url = url;
        breadcrumb.name = name;
        return breadcrumb;
    }

}
