/**
 * Firestore Database Operations
 * Handles all database operations for farmer profiles, analytics, and data persistence
 */

const COLLECTIONS = {
  FARMERS: 'farmers',
  ANALYTICS: 'analytics',
  SESSIONS: 'sessions'
};

/**
 * Create or update farmer profile in Firestore
 */
async function saveFarmerToFirestore(farmerData) {
  try {
    const currentUser = getCurrentAuthUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const db = getFirestore();
    const farmerRef = db.collection(COLLECTIONS.FARMERS).doc(currentUser.uid);

    const dataToSave = {
      uid: currentUser.uid,
      email: currentUser.email,
      ...farmerData,
      updatedAt: new Date(),
      createdAt: farmerRef.get().then(doc => doc.exists ? doc.data().createdAt : new Date())
    };

    await farmerRef.set(dataToSave, { merge: true });
    console.log('✅ Farmer profile saved to Firestore');
    return dataToSave;
  } catch (error) {
    console.error('❌ Error saving farmer:', error);
    throw error;
  }
}

/**
 * Get farmer profile from Firestore
 */
async function getFarmerFromFirestore(uid = null) {
  try {
    const currentUser = getCurrentAuthUser();
    const userId = uid || currentUser?.uid;

    if (!userId) {
      throw new Error('No user specified and user not authenticated');
    }

    const db = getFirestore();
    const farmerRef = db.collection(COLLECTIONS.FARMERS).doc(userId);
    const doc = await farmerRef.get();

    if (!doc.exists) {
      console.warn('⚠️ Farmer profile not found in Firestore');
      return null;
    }

    return doc.data();
  } catch (error) {
    console.error('❌ Error fetching farmer:', error);
    throw error;
  }
}

/**
 * Save analytics data to Firestore
 */
async function saveAnalyticsToFirestore(analyticsData) {
  try {
    const currentUser = getCurrentAuthUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const db = getFirestore();
    const analyticsRef = db.collection(COLLECTIONS.ANALYTICS).doc(currentUser.uid);

    const dataToSave = {
      uid: currentUser.uid,
      ...analyticsData,
      lastUpdated: new Date(),
      farmSize: analyticsData.farmSize || 0,
      activeCrops: analyticsData.activeCrops || 0,
      soilMoisture: analyticsData.soilMoisture || 0,
      yieldIndex: analyticsData.yieldIndex || 0,
      soilPH: analyticsData.soilPH || 7.0,
      healthScore: analyticsData.healthScore || 0
    };

    await analyticsRef.set(dataToSave, { merge: true });
    console.log('✅ Analytics data saved to Firestore');
    return dataToSave;
  } catch (error) {
    console.error('❌ Error saving analytics:', error);
    throw error;
  }
}

/**
 * Get analytics data from Firestore
 */
async function getAnalyticsFromFirestore() {
  try {
    const currentUser = getCurrentAuthUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const db = getFirestore();
    const analyticsRef = db.collection(COLLECTIONS.ANALYTICS).doc(currentUser.uid);
    const doc = await analyticsRef.get();

    if (!doc.exists) {
      console.warn('⚠️ Analytics data not found, returning defaults');
      return null;
    }

    return doc.data();
  } catch (error) {
    console.error('❌ Error fetching analytics:', error);
    throw error;
  }
}

/**
 * Listen to real-time farmer profile updates
 */
function listenToFarmerUpdates(callback) {
  try {
    const currentUser = getCurrentAuthUser();
    if (!currentUser) {
      console.warn('⚠️ User not authenticated for real-time updates');
      return null;
    }

    const db = getFirestore();
    const unsubscribe = db.collection(COLLECTIONS.FARMERS)
      .doc(currentUser.uid)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            callback(doc.data());
          }
        },
        (error) => {
          console.error('❌ Error listening to farmer updates:', error);
        }
      );

    console.log('👂 Listening to real-time farmer updates');
    return unsubscribe;
  } catch (error) {
    console.error('❌ Error setting up listener:', error);
    return null;
  }
}

/**
 * Listen to real-time analytics updates
 */
function listenToAnalyticsUpdates(callback) {
  try {
    const currentUser = getCurrentAuthUser();
    if (!currentUser) {
      console.warn('⚠️ User not authenticated for analytics updates');
      return null;
    }

    const db = getFirestore();
    const unsubscribe = db.collection(COLLECTIONS.ANALYTICS)
      .doc(currentUser.uid)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            callback(doc.data());
          }
        },
        (error) => {
          console.error('❌ Error listening to analytics:', error);
        }
      );

    console.log('👂 Listening to real-time analytics updates');
    return unsubscribe;
  } catch (error) {
    console.error('❌ Error setting up analytics listener:', error);
    return null;
  }
}

/**
 * Search farmers by location or name
 */
async function searchFarmers(searchField, searchValue) {
  try {
    const db = getFirestore();
    const query = db.collection(COLLECTIONS.FARMERS)
      .where(searchField, '==', searchValue)
      .limit(10);

    const snapshot = await query.get();
    const farmers = [];

    snapshot.forEach((doc) => {
      farmers.push(doc.data());
    });

    console.log(`✅ Found ${farmers.length} farmers`);
    return farmers;
  } catch (error) {
    console.error('❌ Error searching farmers:', error);
    throw error;
  }
}

/**
 * Batch update multiple farmer records
 */
async function batchUpdateFarmers(updates) {
  try {
    const db = getFirestore();
    const batch = db.batch();

    Object.entries(updates).forEach(([uid, data]) => {
      const docRef = db.collection(COLLECTIONS.FARMERS).doc(uid);
      batch.update(docRef, { ...data, updatedAt: new Date() });
    });

    await batch.commit();
    console.log('✅ Batch update completed');
  } catch (error) {
    console.error('❌ Error in batch update:', error);
    throw error;
  }
}

/**
 * Delete farmer profile and associated data
 */
async function deleteFarmerAccount(uid) {
  try {
    const db = getFirestore();
    const batch = db.batch();

    // Delete farmer profile
    batch.delete(db.collection(COLLECTIONS.FARMERS).doc(uid));

    // Delete analytics data
    batch.delete(db.collection(COLLECTIONS.ANALYTICS).doc(uid));

    // Delete session data
    batch.delete(db.collection(COLLECTIONS.SESSIONS).doc(uid));

    await batch.commit();
    console.log('✅ Farmer account deleted');
  } catch (error) {
    console.error('❌ Error deleting farmer account:', error);
    throw error;
  }
}

/**
 * Export farmer data for backup/analysis
 */
async function exportFarmerData(uid) {
  try {
    const db = getFirestore();
    const farmerDoc = await db.collection(COLLECTIONS.FARMERS).doc(uid).get();
    const analyticsDoc = await db.collection(COLLECTIONS.ANALYTICS).doc(uid).get();

    const exportData = {
      farmer: farmerDoc.exists ? farmerDoc.data() : null,
      analytics: analyticsDoc.exists ? analyticsDoc.data() : null,
      exportDate: new Date().toISOString()
    };

    console.log('✅ Export data prepared');
    return exportData;
  } catch (error) {
    console.error('❌ Error exporting data:', error);
    throw error;
  }
}
