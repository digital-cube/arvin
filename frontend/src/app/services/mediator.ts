/**
 * Created by nenad on 15.9.17..
 */
import {environment} from '../../environments/environment';

export class MediatorService {


  menuToggle = false;
  closeOverlay = false;
  closeOverlay2 = false;
  closeMobileOverlay = false;
  showLoader = false;
  screenHeight: number;
  openDropdownMenu = false;
  submenuOpen = false;
  appmenuOpen = false;
  mobileScreenHeight = window.screen.height;
  screenWidth = window.screen.width;
  openMobileSearch = false;
  showSearch = false;
  showDateRange = false;
  id_doctor: string;

  constructor() {
    if (this.screenWidth < 416) {
      this.menuToggle = false;
      this.closeOverlay = false;
      localStorage.removeItem('menu_state');
    }
    else {
      const _menu_state = localStorage.getItem('menu_state');
      if (_menu_state !== null) {
        this.menuToggle = _menu_state === 'true';
        this.closeOverlay = (this.screenWidth < 768 + 1) && _menu_state === 'true';
      }
    }
  }

  toggle_sidenav(){
    this.menuToggle = !this.menuToggle;
    localStorage.setItem('menu_state', `${this.menuToggle}`);
  }

}



