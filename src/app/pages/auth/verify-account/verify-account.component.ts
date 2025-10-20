import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyAccountComponent implements OnInit {
  isVerified = signal(false);
  #authService = inject(AuthService);
  #route = inject(ActivatedRoute);


  ngOnInit(): void {
    const id = this.#route.snapshot.paramMap.get('id');
    id && this.verifyToken(id);
  }

  private verifyToken(token: string): void {
    this.#authService.verifyAccount(token).subscribe((res) => this.isVerified.set(res));
  }

}
