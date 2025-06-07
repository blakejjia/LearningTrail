import 'package:flutter/material.dart';
import 'package:learningtrail/app/home_page.dart';
import 'package:learningtrail/app/bloc/system_cubit.dart';
import 'package:learningtrail/app/auth/login_page.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class Entrypage extends StatefulWidget {
  const Entrypage({super.key});

  @override
  State<Entrypage> createState() => _EntrypageState();
}

class _EntrypageState extends State<Entrypage> {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<SystemCubit, SystemState>(
      buildWhen: (previous, current) =>
          previous.runtimeType != current.runtimeType,
      builder: (context, state) {
        if (state is SystemLoggedIn) {
          return const HomePage();
        } else {
          return const LoginPage();
        }
      },
    );
  }
}
