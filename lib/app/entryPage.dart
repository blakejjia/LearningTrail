import 'package:flutter/material.dart';
import 'package:learningtrail/services/auth.dart';
import 'package:learningtrail/app/homePage.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:learningtrail/app/loginPage.dart';

class Entrypage extends StatefulWidget {
  const Entrypage({super.key});

  @override
  State<Entrypage> createState() => _EntrypageState();
}

class _EntrypageState extends State<Entrypage> {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: AuthService().authStateChanges,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return const HomePage();
        } else {
          return const LoginPage();
        }
      },
    );
  }
}
