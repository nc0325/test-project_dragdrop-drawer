import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import homeReducer from './features/home/homeSlice';
import checkCodeReducer from './features/check-code/checkCodeSlice';
import userInfoReducer from './features/userInfo/userInfoSlice';
import accountReducer from './features/account/accountSlice';
import notificationsReducer from './features/notifications/notificationsSlice';
import weeklyOfferReducer from './features/weeekly-offer/weeklyOfferSlice';
import customersReducer from './features/customers/customersSlice';
import productsReducer from './features/products/productsSlice';
import editProductModalReducer from './features/editProductModal/editProductModalSlice';
import searchProductsForSelectReducer from './features/searchProductsForSelect/searchProductsForSelectSlice';
import integrationsReducer from './features/integrations/integrationsSlice';
import offerProvidersReducer from './features/offerProviders/offerProvidersSlice';
import feedbacksReducer from './features/feedbacks/feedbacksSlice';
import addServiceReducer from './features/add-service/addServiceSlice';
import giftCardReducer from './features/gift-card/giftCardSlice';
import activeWaitingListReducer from './features/activeWaitingList/activeWaitingListSlice';
import waitingListReducer from './features/waitingList/waitingListSlice';
import loyaltyReducer from './features/loyalty/loyaltySlice';
import customersEngagementReducer from './features/customersEngagement/customersEngagementSlice';
import bookWaitingListReducer from './features/bookWaitingList/bookWaitingListSlice';
import activeReservationsReducer from './features/activeReservations/activeReservationsSlice';
import reservationsReducer from './features/reservations/reservationsSlice';
import bookReservationReducer from './features/bookReservation/bookRerservationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    checkCode: checkCodeReducer,
    userInfo: userInfoReducer,
    account: accountReducer,
    notifications: notificationsReducer,
    weeklyOffer: weeklyOfferReducer,
    customers: customersReducer,
    products: productsReducer,
    editProductModal: editProductModalReducer,
    searchProductsForSelect: searchProductsForSelectReducer,
    integrations: integrationsReducer,
    offerProviders: offerProvidersReducer,
    feedbacks: feedbacksReducer,
    addService: addServiceReducer,
    giftCard: giftCardReducer,
    activeWaitingList: activeWaitingListReducer,
    waitingList: waitingListReducer,
    loyalty: loyaltyReducer,
    customersEngagement: customersEngagementReducer,
    bookWaitingList: bookWaitingListReducer,
    activeReservations: activeReservationsReducer,
    reservations: reservationsReducer,
    bookReservation: bookReservationReducer,
  },
});
