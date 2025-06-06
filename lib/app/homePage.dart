import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:learningtrail/services/auth.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final User? user = AuthService().currentUser;

    Future<void> _signOut() async {
      await AuthService().signOut();
    }

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text('Home Page'),
          Text(user?.email ?? 'No user'),
          ElevatedButton(onPressed: _signOut, child: const Text('Sign Out')),
        ],
      ),
    );
  }
}
