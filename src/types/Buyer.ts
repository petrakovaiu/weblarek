import type { IBuyer } from './index.ts';


export class Buyer {
    user!: IBuyer[];
    
    setItems(items: IBuyer[]): void {
        this.user = items
    }
        
    getItems(): IBuyer[] {
        return this.user
    }
}