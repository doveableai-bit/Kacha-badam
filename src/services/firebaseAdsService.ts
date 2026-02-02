import { db } from './firebaseConfig';
import { collection, getDocs, setDoc, deleteDoc, doc, query } from 'firebase/firestore';

export interface PlacementAd {
  adsterra?: {
    zoneId?: string;
    format?: string;
    height?: number;
    width?: number;
    rawScript?: string;
  };
}

export class FirebaseAdsService {
  private static collectionName = 'placement_ads';

  // Get all ads from Firestore
  static async getAllAds(): Promise<Record<string, PlacementAd>> {
    try {
      if (!db) {
        console.log('Firebase not initialized');
        return {};
      }

      const querySnapshot = await getDocs(collection(db, this.collectionName));
      const ads: Record<string, PlacementAd> = {};
      
      querySnapshot.forEach((doc) => {
        ads[doc.id] = doc.data() as PlacementAd;
      });

      return ads;
    } catch (error) {
      console.error('Error fetching ads from Firebase:', error);
      return {};
    }
  }

  // Save a single ad to Firestore
  static async saveAd(placementKey: string, adConfig: PlacementAd): Promise<boolean> {
    try {
      if (!db) {
        console.log('Firebase not initialized');
        return false;
      }

      const docRef = doc(db, this.collectionName, placementKey);
      await setDoc(docRef, adConfig, { merge: true });
      console.log(`✅ Ad saved to Firebase: ${placementKey}`);
      return true;
    } catch (error) {
      console.error(`Error saving ad to Firebase: ${placementKey}`, error);
      return false;
    }
  }

  // Delete a single ad from Firestore
  static async deleteAd(placementKey: string): Promise<boolean> {
    try {
      if (!db) {
        console.log('Firebase not initialized');
        return false;
      }

      const docRef = doc(db, this.collectionName, placementKey);
      await deleteDoc(docRef);
      console.log(`✅ Ad deleted from Firebase: ${placementKey}`);
      return true;
    } catch (error) {
      console.error(`Error deleting ad from Firebase: ${placementKey}`, error);
      return false;
    }
  }

  // Delete all ads from Firestore
  static async deleteAllAds(): Promise<boolean> {
    try {
      if (!db) {
        console.log('Firebase not initialized');
        return false;
      }

      const querySnapshot = await getDocs(collection(db, this.collectionName));
      
      for (const docSnapshot of querySnapshot.docs) {
        const docRef = doc(db, this.collectionName, docSnapshot.id);
        await deleteDoc(docRef);
      }

      console.log('✅ All ads deleted from Firebase');
      return true;
    } catch (error) {
      console.error('Error deleting all ads from Firebase:', error);
      return false;
    }
  }
}
