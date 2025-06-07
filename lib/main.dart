import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'app/entry_page.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:learningtrail/app/bloc/system_cubit.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(
    BlocProvider(create: (context) => SystemCubit(), child: const MyApp()),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Learning Trail',
      theme: ThemeData(
        colorScheme:
            ColorScheme.fromSeed(
              seedColor: Colors.white,
              brightness: Brightness.light,
            ).copyWith(
              brightness: Brightness.light,
              // primary, secondary containers
              primaryContainer: Color(0xFF61e002),
              onPrimaryContainer: Colors.white,
              secondaryContainer: Color(0xFF38a9de),
              onSecondaryContainer: Colors.white,
              // Text input container
              tertiaryContainer: Color(0xFFf7f7f7),
              onTertiaryContainer: Color(0xFF434343),
              // surface
              surface: Colors.white,
              surfaceContainerHigh: Color(0xFFe5e5e5),
              onSurface: Color(0xFF434343), // color for normal text
              onSurfaceVariant: Color(0Xaa6b6b6b), // color for hint text
              // other
              error: Colors.red,
              onError: Colors.white,
            ),
      ),
      home: Scaffold(body: Entrypage()),
    );
  }
}
