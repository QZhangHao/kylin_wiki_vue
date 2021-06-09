import { useStore } from '@/store/index';
import { isArray } from '@/utils/is';
import { intersection } from '@/utils/lodash';

// User permissions related operations
export function usePermission() {
    const userStore = useStore(); 
   
    /**
     * Determine whether there is permission
     */
    function hasPermission(value?:  string | string[], def = true): boolean { 
 
        // Visible by default
        if (!value) {
          return def;
        }
        if (!isArray(value)) { 
          return userStore.getters.userInfo.auth?.includes(value);
        }
        return (intersection(value, userStore.getters.userInfo.auth)).length > 0; 
   
      return true;
    } 
  
    return { hasPermission};
  }