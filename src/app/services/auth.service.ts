import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from 'firebase';


@Injectable()
export class AuthService {

    private isAuthenticated = false;
    authChange = new Subject<boolean>();
    private fbSubs: Subscription[] = [];
    currentUser: User;
    currentUserChange = new Subject<User>();

    constructor(private afAuth: AngularFireAuth,
    private sb: MatSnackBar) { }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                if (user.email) {
                    this.isAuthenticated = true;
                    this.authChange.next(true);
                }
                this.currentUser = user;
                this.currentUserChange.next(this.currentUser);
            } else {
                this.currentUser = null;
                this.currentUserChange.next(null);
                this.isAuthenticated = false;
                this.authChange.next(false);
            }
        });
    }

    getUser() {
        return this.afAuth.auth.currentUser;
    }

    getIdToken() {
        return this.currentUser.getIdToken();
    }

    registerUser(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    login(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        this.afAuth.auth.signOut().then(res => {
            this.cancelSubs();
        });
    }

    cancelSubs() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

}
