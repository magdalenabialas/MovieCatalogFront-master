import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  @Output() resetEvent = new EventEmitter<void>();
  searchTerm = '';

  private roles: string[] = [];
  isLoggedIn = false;

  username?: string;


  constructor(private route: ActivatedRoute, private router: Router, private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['searchTerm']) this.searchTerm = params['searchTerm'];
    });

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

  search(): void {
    this.searchEvent.emit(this.searchTerm);
  }

  reset() {
    this.searchTerm = '';
    this.resetEvent.emit();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
