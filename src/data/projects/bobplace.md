# BobPlace

## App Introduction

BobPlace means "place where you have meals" (Bob means meal in Korean).

The number of people using food delivery services is increasing, and delivery fees are becoming increasingly expensive. Therefore, many people are starting to use pickup services to save on delivery fees.

**Problem Statement:**

- Expensive delivery fees burden both users and small restaurant owners
- High commission rates reduce restaurant profit margins
- Customers are discouraged from dining out due to convenience of delivery

**Our Solution:**

- Motivate users to go outside for meals using gamification and points system
- Provide restaurants with a better way to attract customers with improved business margins
- Create a win-win ecosystem for both customers and restaurant owners

BobPlace uses gamification to encourage users to dine out at physical restaurants, solving the delivery fee problem through two complementary applications: one for customers and one for restaurant owners.

## Key Features

### Gamification System

- **Point-based Rewards**: Earn points for dining out at participating restaurants
- **Achievement Badges**: Unlock badges for trying new cuisines and visiting different locations
- **Leaderboards**: Compete with friends and local community members
- **Challenge System**: Daily and weekly challenges to explore new dining experiences

### Social Dining

- **Friend Network**: Connect with friends and share dining experiences
- **Group Challenges**: Team up with friends for group dining rewards
- **Restaurant Reviews**: Share and discover restaurant recommendations
- **Photo Sharing**: Capture and share memorable dining moments

### Location-based Features

- **Restaurant Discovery**: Find nearby participating restaurants
- **GPS Check-in**: Verify restaurant visits for point accumulation
- **Local Promotions**: Access exclusive deals from local businesses
- **Neighborhood Exploration**: Discover hidden gems in different areas

## System Design

The BobPlace ecosystem consists of two interconnected mobile applications with a robust backend infrastructure supporting real-time communication and location-based services.

![System Architecture](https://prod-files-secure.s3.us-west-2.amazonaws.com/32be49e7-19ab-401c-a0f7-787c4db3ab07/b131ab60-eeb3-4605-add9-9b4a8ec935cc/%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7_%E1%84%80%E1%85%AE%E1%84%89%E1%85%A1%E1%86%BC%E1%84%83%E1%85%A9.drawio.png)

## Features Developed

### **Customer App**

#### **Authentication & User Management**

- **Multi-Platform Social Login**: Google, Apple, and Kakao social authentication
- **JWT Token Management**: Automatic token refresh using Axios Interceptors
- **Auto-Login**: Seamless user experience with persistent authentication
- **Form Handling**: React-hook-form implementation for efficient data management

#### **User Interface & Experience**

- **Responsive Header**: Animated header that responds to scroll interactions
- **Location Services**: Address update modal with geolocation integration
- **Mission System**: Interactive mission cards with detailed information display
- **Review System**: Image upload functionality with customized rating components

#### **Real-Time Features**

- **Live Communication**: Real-time data sync between customer and restaurant apps
- **Push Notifications**: Firebase Cloud Messaging for mission status updates
- **Dynamic Updates**: Automatic mission page refresh based on status changes

#### **Map & Location Services**

- **Interactive Maps**: WebView-based map showing nearby restaurants with pins
- **Data Bridge**: Seamless data communication between WebView and React Native
- **Restaurant Details**: Modal-based restaurant information display
- **Review Gallery**: Infinite scroll for restaurant reviews and images

### **Restaurant Owner App**

#### **Business Management**

- **Restaurant Registration**: Comprehensive onboarding with business information setup
- **Operating Hours**: Flexible schedule management and editing capabilities
- **Mission Analytics**: Track mission exposure metrics and performance data
- **Review Management**: Respond to customer reviews and feedback

#### **Real-Time Operations**

- **Live Mission Tracking**: Monitor users currently engaged in missions
- **Approval System**: Review and approve completed mission requests
- **Automatic Updates**: Real-time refresh when missions are completed
- **Status Management**: Dynamic mission status updates across both applications

## Technical Implementation

### **Mobile Development Stack**

- **React Native**: Cross-platform development for iOS and Android
- **TypeScript**: Type-safe development ensuring code reliability
- **Native Modules**: Custom integrations for location and camera services
- **Firebase Cloud Messaging**: Real-time push notifications

### **State Management & Data**

- **Recoil**: Efficient state management for complex app interactions
- **React Query**: Optimized data fetching and caching strategies
- **Axios Interceptors**: Automatic token refresh and error handling
- **Offline Support**: Local data persistence for seamless user experience

### **Backend Integration**

- **RESTful APIs**: Robust API design for user data and restaurant information
- **Real-time Synchronization**: Live data updates between customer and restaurant apps
- **Location Services**: GPS integration for accurate check-in verification
- **Image Processing**: Efficient image upload and storage management

## App Store Success

📱 **iOS**: [Download on App Store](https://apps.apple.com/kr/app/%EB%B0%A5%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4/id1634665858)

🤖 **Android**: [Download on Google Play](https://play.google.com/store/apps/details?id=com.bob_frontend)

🎥 **Demo Video**: [Watch on YouTube](https://youtu.be/5WCTnaL8dBg)

## Development Highlights

### **Problem-Solving Approach**

- **Market Research**: Identified the pain point of expensive delivery fees affecting both customers and restaurants
- **User Behavior Analysis**: Designed gamification mechanics to incentivize dining out
- **Business Model Innovation**: Created a sustainable ecosystem benefiting all stakeholders
- **Local Business Support**: Developed tools to help restaurants attract customers with better margins

### **Technical Achievements**

- **Dual-App Architecture**: Successfully developed and deployed two interconnected applications
- **Cross-Platform Success**: Launched on both iOS and Android App Stores simultaneously
- **Real-Time Communication**: Implemented seamless data synchronization between customer and restaurant apps
- **Scalable Infrastructure**: Built architecture to handle growing user base and restaurant network
- **Performance Optimization**: Achieved smooth user experience with efficient data handling and caching

### **Innovation & Impact**

- **Gamification Design**: Created engaging point-based reward system to change user behavior
- **Social Integration**: Built community features to enhance user engagement
- **Location Intelligence**: Developed sophisticated location-based services for restaurant discovery
- **Business Intelligence**: Provided restaurant owners with analytics and mission tracking tools

### **User Experience Excellence**

- **Intuitive Design**: Created user-friendly interfaces for both customer and business applications
- **Seamless Authentication**: Implemented multiple social login options with automatic token management
- **Real-Time Feedback**: Developed instant notification system for mission updates and approvals
- **Accessibility**: Designed inclusive interfaces accommodating users with different abilities

## Development Timeline

**Duration**: May 1 - July 31, 2022 (3 months)

**Project Phases:**

- **Phase 1**: Market research, system design, and architecture planning
- **Phase 2**: Core feature development for both customer and restaurant applications
- **Phase 3**: Real-time communication implementation and testing
- **Phase 4**: UI/UX refinement, performance optimization, and app store preparation
- **Phase 5**: Dual-platform launch and post-launch monitoring

**Key Milestones:**

- ✅ Dual-app architecture design and implementation
- ✅ Real-time communication system between apps
- ✅ Social authentication integration (Google, Apple, Kakao)
- ✅ Location-based services and map integration
- ✅ Gamification system with points and missions
- ✅ Successful iOS and Android App Store approval and launch

---

## Project Impact & Results

**Technical Accomplishments:**

- Successfully launched two interconnected mobile applications
- Implemented real-time data synchronization across platforms
- Achieved seamless cross-platform deployment (iOS & Android)
- Built scalable architecture supporting multiple user types

**Business Impact:**

- Created innovative solution addressing delivery fee problem
- Developed sustainable business model for restaurants and customers
- Established foundation for local business ecosystem growth

---

_This project demonstrates comprehensive expertise in mobile app development, real-time systems architecture, gamification design, social features implementation, and successful dual-platform app store deployment._
