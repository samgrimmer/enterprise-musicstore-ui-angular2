var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var route_config_1 = require('../../route.config');
var genre_service_1 = require('../../services/genre.service');
var config_1 = require('../../config');
var LoggedInOutlet_1 = require('./LoggedInOutlet');
var AppComponent = (function () {
    function AppComponent(genreService, router) {
        this.genreService = genreService;
        this.router = router;
        this.title = 'SSW Angular 2 Music Store';
        this.routes = route_config_1.Routes;
        this.getGenres();
        this.setUser();
    }
    AppComponent.prototype.onInit = function () {
        this.lock = new Auth0Lock(config_1.AUTH0_CLIENT_ID, config_1.AUTH0_DOMAIN);
    };
    AppComponent.prototype.setUser = function () {
        var savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            this.user = savedUser;
        }
        ;
    };
    AppComponent.prototype.getGenres = function () {
        var _this = this;
        this.genres = [];
        this.genreService.getGenres()
            .then(function (genres) { return _this.genres = genres; });
        return this.genres;
    };
    AppComponent.prototype.goToGenre = function (genre) {
        this.router.navigate([("/" + route_config_1.Routes.genre.as), { name: genre.name }]);
    };
    AppComponent.prototype.login = function () {
        var _this = this;
        this.lock.show({
            focusInput: false,
            popup: true
        }, function (err, profile, token) {
            if (err)
                console.log('login error:', err);
            if (token)
                localStorage.setItem('jwt', token);
            if (profile) {
                localStorage.setItem('user', JSON.stringify(profile));
                _this.user = profile;
            }
        });
    };
    AppComponent.prototype.register = function () {
        ///callback and error function
        // TODO route or login on register
        this.lock.showSignup(null, function (err) {
            console.log(err);
        });
    };
    AppComponent.prototype.logout = function () {
        this.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('jwt');
        //needed to hide img in menu as hidden is not working
        location.reload();
    };
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'app',
            template: "\n      <div class=\"navbar-collapse collapse inverse\" id=\"navbar-header\">\n      \t<div class=\"container-fluid\">\n      \t\t<div class=\"about\">\n      \t\t\t<h4>About</h4>\n      \t\t\t<p class=\"text-muted\">\n      \t\t\t\tThis is the Angular 2 version of the classic ASP.NET MVC Music store rewritten with ASP.NET5, Angular 2, BootStrap 4 and the SSW Enterprise way.\n      \t\t\t</p>\n      \t\t</div>\n      \t\t<div class=\"\">\n      \t\t\t<h4>Contact</h4>\n      \t\t\t<ul class=\"list-unstyled\">\n      \t\t\t\t<li><a href=\"https://github.com/SSWConsulting/angularmusicstore\">SSW Angular2 Music Store &copy; </a></li>\n      \t\t\t</ul>\n      \t\t</div>\n      \t</div>\n      </div>\n      <div class=\"navbar navbar-dark bg-inverse navbar-static-top\">\n      \t<div class=\"container-fluid\">\n      \t\t<button class=\"navbar-toggler pull-left\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar-header\">\n      \t\t\t&#9776;\n      \t\t</button>\n      \t\t<a [router-link]=\"['/' + routes.dashboard.as]\" class=\"navbar-brand\">{{title}}</a>\n      \t\t<ul class=\"nav navbar-nav\">\n      \t\t\t<li class=\"nav-item\">\n      \t\t\t\t<div class=\"btn-group\">\n      \t\t\t\t\t<button type=\"button\" class=\"btn menu-dropdown dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n      \t\t\t\t\t\tStore\n      \t\t\t\t\t</button>\n      \t\t\t\t\t<div class=\"dropdown-menu\">\n      \t\t\t\t\t\t<a class=\"dropdown-item\"\n      \t\t\t\t\t\t   (click)=\"goToGenre(genre)\"\n      \t\t\t\t\t\t   *ng-for=\"#genre of genres\">\n      \t\t\t\t\t\t\t{{genre.name}}\n      \t\t\t\t\t\t</a>\n      \t\t\t\t\t\t<div class=\"dropdown-divider\"></div>\n      \t\t\t\t\t\t<a class=\"dropdown-item\" [router-link]=\"['/' + routes.genres.as]\">Genre List</a>\n      \t\t\t\t\t</div>\n      \t\t\t\t</div>\n      \t\t\t</li>\n      \t\t\t<li class=\"nav-item\">\n      \t\t\t<a class=\"nav-link\" [hidden]=\"!user\" [router-link]=\"['/' + routes.cart.as]\">Cart</a>\n      \t\t\t</li>\n      \t\t\t<li class=\"nav-item pull-right\" [hidden]=\"user\">\n      \t\t\t\t<a class=\"nav-link\" (click)=\"register()\">Register</a>\n      \t\t\t</li>\n      \t\t\t<li class=\"nav-item pull-right\">\n      \t\t\t\t<a class=\"nav-link\"  [hidden]=\"user\" (click)=\"login()\">Login</a>\n      \t\t\t</li>\n      \t\t\t<li class=\"nav-item pull-right\" [hidden]=\"!user\">\n      \t\t\t\t<a class=\"nav-link\"  (click)=\"logout()\">Logout</a>\n      \t\t\t</li>\n      \t\t\t<li class=\"nav-item pull-right\" [hidden]=\"!user\">\n      \t\t\t\t<a class=\"nav-link\" >{{user?.email}}</a>\n      \t\t\t</li>\n      \t\t\t<li class=\"nav-item pull-right\"  [hidden]=\"!user\">\n      \t\t\t\t<img [src]=\"user?.picture\" class=\"img-responsive\" height=\"35\" width=\"35\">\n      \t\t\t</li>\n      \t\t</ul>\n      \t</div>\n      </div>\n      <div class=\"container-fluid\">\n      \t<router-outlet></router-outlet>\n      </div>\n      <footer class=\"text-muted\">\n      \t<div class=\"container\">\n      \t\t<p><a href=\"https://github.com/SSWConsulting/angularmusicstore\">SSW Angular2 Music Store &copy; </a></p>\n      \t</div>\n      </footer>\n    ",
            styles: ["\n\n      .btn-group > .menu-dropdown {\n      \tbackground-color: transparent;\n      }\n\n      .router-link {\n      \tpadding: 5px;\n      \ttext-decoration: none;\n      }\n\n      .router-link:visited, .router-link:link {\n      \tcolor: #444;\n      }\n\n      .router-link:hover {\n      \tcolor: white;\n      \ttext-decoration: none;\n      }\n\n      .router-link.router-link-active {\n      \tcolor: white;\n      }\n    "],
            directives: [router_1.ROUTER_DIRECTIVES, angular2_1.CORE_DIRECTIVES, LoggedInOutlet_1.LoggedInRouterOutlet]
        }),
        router_1.RouteConfig(route_config_1.APP_ROUTES), 
        __metadata('design:paramtypes', [genre_service_1.GenreService, router_1.Router])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwL2FwcC50cyJdLCJuYW1lcyI6WyJBcHBDb21wb25lbnQiLCJBcHBDb21wb25lbnQuY29uc3RydWN0b3IiLCJBcHBDb21wb25lbnQub25Jbml0IiwiQXBwQ29tcG9uZW50LnNldFVzZXIiLCJBcHBDb21wb25lbnQuZ2V0R2VucmVzIiwiQXBwQ29tcG9uZW50LmdvVG9HZW5yZSIsIkFwcENvbXBvbmVudC5sb2dpbiIsIkFwcENvbXBvbmVudC5yZWdpc3RlciIsIkFwcENvbXBvbmVudC5sb2dvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEseUJBQWlELG1CQUFtQixDQUFDLENBQUE7QUFDckUsdUJBQXNELGlCQUFpQixDQUFDLENBQUE7QUFDeEUsNkJBQWlDLG9CQUFvQixDQUFDLENBQUE7QUFDdEQsOEJBQTJCLDhCQUE4QixDQUFDLENBQUE7QUFFMUQsdUJBQTZDLGNBQWMsQ0FBQyxDQUFBO0FBQzVELCtCQUFtQyxrQkFBa0IsQ0FBQyxDQUFBO0FBRXREO0lBMkdJQSxzQkFBb0JBLFlBQTBCQSxFQUFTQSxNQUFjQTtRQUFqREMsaUJBQVlBLEdBQVpBLFlBQVlBLENBQWNBO1FBQVNBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVFBO1FBTjlEQSxVQUFLQSxHQUFHQSwyQkFBMkJBLENBQUNBO1FBQ3BDQSxXQUFNQSxHQUFHQSxxQkFBTUEsQ0FBQ0E7UUFNbkJBLElBQUlBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBO1FBQ2pCQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtJQUNuQkEsQ0FBQ0E7SUFFREQsNkJBQU1BLEdBQU5BO1FBQ0lFLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLFNBQVNBLENBQUNBLHdCQUFlQSxFQUFFQSxxQkFBWUEsQ0FBQ0EsQ0FBQ0E7SUFDN0RBLENBQUNBO0lBRURGLDhCQUFPQSxHQUFQQTtRQUNJRyxJQUFJQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZ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MEJBQWlCQSxFQUFFQSwwQkFBZUEsRUFBRUEscUNBQW9CQSxDQUFDQTtTQUN6RUEsQ0FBQ0E7UUFFREEsb0JBQVdBLENBQUNBLHlCQUFVQSxDQUFDQTs7cUJBaUV2QkE7SUFBREEsbUJBQUNBO0FBQURBLENBcEtBLEFBb0tDQSxJQUFBO0FBaEVZLG9CQUFZLGVBZ0V4QixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvYXBwL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDT1JFX0RJUkVDVElWRVMsIE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvYW5ndWxhcjInO1xuaW1wb3J0IHtSb3V0ZUNvbmZpZywgUm91dGVyLCBST1VURVJfRElSRUNUSVZFUyB9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG5pbXBvcnQge1JvdXRlcywgQVBQX1JPVVRFU30gZnJvbSAnLi4vLi4vcm91dGUuY29uZmlnJztcbmltcG9ydCB7R2VucmVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nZW5yZS5zZXJ2aWNlJztcbmltcG9ydCB7R2VucmUsIFVzZXJ9IGZyb20gJy4uLy4uL21vZGVscyc7XG5pbXBvcnQge0FVVEgwX0RPTUFJTiwgQVVUSDBfQ0xJRU5UX0lEIH0gZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7TG9nZ2VkSW5Sb3V0ZXJPdXRsZXR9IGZyb20gJy4vTG9nZ2VkSW5PdXRsZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItY29sbGFwc2UgY29sbGFwc2UgaW52ZXJzZVwiIGlkPVwibmF2YmFyLWhlYWRlclwiPlxuICAgICAgXHQ8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICBcdFx0PGRpdiBjbGFzcz1cImFib3V0XCI+XG4gICAgICBcdFx0XHQ8aDQ+QWJvdXQ8L2g0PlxuICAgICAgXHRcdFx0PHAgY2xhc3M9XCJ0ZXh0LW11dGVkXCI+XG4gICAgICBcdFx0XHRcdFRoaXMgaXMgdGhlIEFuZ3VsYXIgMiB2ZXJzaW9uIG9mIHRoZSBjbGFzc2ljIEFTUC5ORVQgTVZDIE11c2ljIHN0b3JlIHJld3JpdHRlbiB3aXRoIEFTUC5ORVQ1LCBBbmd1bGFyIDIsIEJvb3RTdHJhcCA0IGFuZCB0aGUgU1NXIEVudGVycHJpc2Ugd2F5LlxuICAgICAgXHRcdFx0PC9wPlxuICAgICAgXHRcdDwvZGl2PlxuICAgICAgXHRcdDxkaXYgY2xhc3M9XCJcIj5cbiAgICAgIFx0XHRcdDxoND5Db250YWN0PC9oND5cbiAgICAgIFx0XHRcdDx1bCBjbGFzcz1cImxpc3QtdW5zdHlsZWRcIj5cbiAgICAgIFx0XHRcdFx0PGxpPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vU1NXQ29uc3VsdGluZy9hbmd1bGFybXVzaWNzdG9yZVwiPlNTVyBBbmd1bGFyMiBNdXNpYyBTdG9yZSAmY29weTsgPC9hPjwvbGk+XG4gICAgICBcdFx0XHQ8L3VsPlxuICAgICAgXHRcdDwvZGl2PlxuICAgICAgXHQ8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZGFyayBiZy1pbnZlcnNlIG5hdmJhci1zdGF0aWMtdG9wXCI+XG4gICAgICBcdDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgIFx0XHQ8YnV0dG9uIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXIgcHVsbC1sZWZ0XCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNuYXZiYXItaGVhZGVyXCI+XG4gICAgICBcdFx0XHQmIzk3NzY7XG4gICAgICBcdFx0PC9idXR0b24+XG4gICAgICBcdFx0PGEgW3JvdXRlci1saW5rXT1cIlsnLycgKyByb3V0ZXMuZGFzaGJvYXJkLmFzXVwiIGNsYXNzPVwibmF2YmFyLWJyYW5kXCI+e3t0aXRsZX19PC9hPlxuICAgICAgXHRcdDx1bCBjbGFzcz1cIm5hdiBuYXZiYXItbmF2XCI+XG4gICAgICBcdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XG4gICAgICBcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gbWVudS1kcm9wZG93biBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgIFx0XHRcdFx0XHRcdFN0b3JlXG4gICAgICBcdFx0XHRcdFx0PC9idXR0b24+XG4gICAgICBcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj5cbiAgICAgIFx0XHRcdFx0XHRcdDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiXG4gICAgICBcdFx0XHRcdFx0XHQgICAoY2xpY2spPVwiZ29Ub0dlbnJlKGdlbnJlKVwiXG4gICAgICBcdFx0XHRcdFx0XHQgICAqbmctZm9yPVwiI2dlbnJlIG9mIGdlbnJlc1wiPlxuICAgICAgXHRcdFx0XHRcdFx0XHR7e2dlbnJlLm5hbWV9fVxuICAgICAgXHRcdFx0XHRcdFx0PC9hPlxuICAgICAgXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImRyb3Bkb3duLWRpdmlkZXJcIj48L2Rpdj5cbiAgICAgIFx0XHRcdFx0XHRcdDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIFtyb3V0ZXItbGlua109XCJbJy8nICsgcm91dGVzLmdlbnJlcy5hc11cIj5HZW5yZSBMaXN0PC9hPlxuICAgICAgXHRcdFx0XHRcdDwvZGl2PlxuICAgICAgXHRcdFx0XHQ8L2Rpdj5cbiAgICAgIFx0XHRcdDwvbGk+XG4gICAgICBcdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgXHRcdFx0PGEgY2xhc3M9XCJuYXYtbGlua1wiIFtoaWRkZW5dPVwiIXVzZXJcIiBbcm91dGVyLWxpbmtdPVwiWycvJyArIHJvdXRlcy5jYXJ0LmFzXVwiPkNhcnQ8L2E+XG4gICAgICBcdFx0XHQ8L2xpPlxuICAgICAgXHRcdFx0PGxpIGNsYXNzPVwibmF2LWl0ZW0gcHVsbC1yaWdodFwiIFtoaWRkZW5dPVwidXNlclwiPlxuICAgICAgXHRcdFx0XHQ8YSBjbGFzcz1cIm5hdi1saW5rXCIgKGNsaWNrKT1cInJlZ2lzdGVyKClcIj5SZWdpc3RlcjwvYT5cbiAgICAgIFx0XHRcdDwvbGk+XG4gICAgICBcdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbSBwdWxsLXJpZ2h0XCI+XG4gICAgICBcdFx0XHRcdDxhIGNsYXNzPVwibmF2LWxpbmtcIiAgW2hpZGRlbl09XCJ1c2VyXCIgKGNsaWNrKT1cImxvZ2luKClcIj5Mb2dpbjwvYT5cbiAgICAgIFx0XHRcdDwvbGk+XG4gICAgICBcdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbSBwdWxsLXJpZ2h0XCIgW2hpZGRlbl09XCIhdXNlclwiPlxuICAgICAgXHRcdFx0XHQ8YSBjbGFzcz1cIm5hdi1saW5rXCIgIChjbGljayk9XCJsb2dvdXQoKVwiPkxvZ291dDwvYT5cbiAgICAgIFx0XHRcdDwvbGk+XG4gICAgICBcdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbSBwdWxsLXJpZ2h0XCIgW2hpZGRlbl09XCIhdXNlclwiPlxuICAgICAgXHRcdFx0XHQ8YSBjbGFzcz1cIm5hdi1saW5rXCIgPnt7dXNlcj8uZW1haWx9fTwvYT5cbiAgICAgIFx0XHRcdDwvbGk+XG4gICAgICBcdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbSBwdWxsLXJpZ2h0XCIgIFtoaWRkZW5dPVwiIXVzZXJcIj5cbiAgICAgIFx0XHRcdFx0PGltZyBbc3JjXT1cInVzZXI/LnBpY3R1cmVcIiBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgaGVpZ2h0PVwiMzVcIiB3aWR0aD1cIjM1XCI+XG4gICAgICBcdFx0XHQ8L2xpPlxuICAgICAgXHRcdDwvdWw+XG4gICAgICBcdDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICBcdDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGZvb3RlciBjbGFzcz1cInRleHQtbXV0ZWRcIj5cbiAgICAgIFx0PGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgXHRcdDxwPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vU1NXQ29uc3VsdGluZy9hbmd1bGFybXVzaWNzdG9yZVwiPlNTVyBBbmd1bGFyMiBNdXNpYyBTdG9yZSAmY29weTsgPC9hPjwvcD5cbiAgICAgIFx0PC9kaXY+XG4gICAgICA8L2Zvb3Rlcj5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcblxuICAgICAgLmJ0bi1ncm91cCA+IC5tZW51LWRyb3Bkb3duIHtcbiAgICAgIFx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICB9XG5cbiAgICAgIC5yb3V0ZXItbGluayB7XG4gICAgICBcdHBhZGRpbmc6IDVweDtcbiAgICAgIFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgfVxuXG4gICAgICAucm91dGVyLWxpbms6dmlzaXRlZCwgLnJvdXRlci1saW5rOmxpbmsge1xuICAgICAgXHRjb2xvcjogIzQ0NDtcbiAgICAgIH1cblxuICAgICAgLnJvdXRlci1saW5rOmhvdmVyIHtcbiAgICAgIFx0Y29sb3I6IHdoaXRlO1xuICAgICAgXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIC5yb3V0ZXItbGluay5yb3V0ZXItbGluay1hY3RpdmUge1xuICAgICAgXHRjb2xvcjogd2hpdGU7XG4gICAgICB9XG4gICAgYF0sXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBDT1JFX0RJUkVDVElWRVMsIExvZ2dlZEluUm91dGVyT3V0bGV0XVxufSlcblxuQFJvdXRlQ29uZmlnKEFQUF9ST1VURVMpXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgdGl0bGUgPSAnU1NXIEFuZ3VsYXIgMiBNdXNpYyBTdG9yZSc7XG4gICAgcHVibGljIHJvdXRlcyA9IFJvdXRlcztcbiAgICBwdWJsaWMgZ2VucmVzOiBHZW5yZVtdO1xuICAgIHB1YmxpYyB1c2VyOiBVc2VyO1xuICAgIHByaXZhdGUgbG9jazogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnZW5yZVNlcnZpY2U6IEdlbnJlU2VydmljZSwgcHVibGljIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMuZ2V0R2VucmVzKCk7XG4gICAgICAgIHRoaXMuc2V0VXNlcigpO1xuICAgIH1cblxuICAgIG9uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5sb2NrID0gbmV3IEF1dGgwTG9jayhBVVRIMF9DTElFTlRfSUQsIEFVVEgwX0RPTUFJTik7XG4gICAgfVxuXG4gICAgc2V0VXNlcigpIHtcbiAgICAgICAgbGV0IHNhdmVkVXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSk7XG4gICAgICAgIGlmIChzYXZlZFVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IHNhdmVkVXNlcjtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRHZW5yZXMoKSB7XG4gICAgICAgIHRoaXMuZ2VucmVzID0gW107XG4gICAgICAgIHRoaXMuZ2VucmVTZXJ2aWNlLmdldEdlbnJlcygpXG4gICAgICAgICAgICAudGhlbihnZW5yZXMgPT4gdGhpcy5nZW5yZXMgPSBnZW5yZXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZW5yZXM7XG4gICAgfVxuXG4gICAgZ29Ub0dlbnJlKGdlbnJlOiBHZW5yZSkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYC8ke1JvdXRlcy5nZW5yZS5hc31gLCB7IG5hbWU6IGdlbnJlLm5hbWUgfV0pO1xuICAgIH1cblxuICAgIGxvZ2luKCkge1xuICAgICAgICB0aGlzLmxvY2suc2hvdyh7XG4gICAgICAgICAgICBmb2N1c0lucHV0OiBmYWxzZSxcbiAgICAgICAgICAgIHBvcHVwOiB0cnVlXG4gICAgICAgIH0sIChlcnIsIHByb2ZpbGUsIHRva2VuKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmxvZygnbG9naW4gZXJyb3I6JywgZXJyKTtcbiAgICAgICAgICAgIGlmICh0b2tlbikgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2p3dCcsIHRva2VuKTtcbiAgICAgICAgICAgIGlmIChwcm9maWxlKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShwcm9maWxlKSk7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyID0gcHJvZmlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXIoKSB7XG4gICAgICAgIC8vL2NhbGxiYWNrIGFuZCBlcnJvciBmdW5jdGlvblxuICAgICAgICAvLyBUT0RPIHJvdXRlIG9yIGxvZ2luIG9uIHJlZ2lzdGVyXG4gICAgICAgIHRoaXMubG9jay5zaG93U2lnbnVwKG51bGwsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvZ291dCgpIHtcbiAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXInKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2p3dCcpO1xuICAgICAgICAvL25lZWRlZCB0byBoaWRlIGltZyBpbiBtZW51IGFzIGhpZGRlbiBpcyBub3Qgd29ya2luZ1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==