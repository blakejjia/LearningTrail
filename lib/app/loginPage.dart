import 'package:flutter/material.dart';
import 'package:learningtrail/components/themedButton.dart';
import 'package:learningtrail/components/themedText.dart';
import 'package:learningtrail/components/themedTextInput.dart';
import 'package:learningtrail/services/auth.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  String _errorMessage = '';
  bool _isLoading = false;

  Future<void> _signIn() async {
    if (_emailController.text.isEmpty || _passwordController.text.isEmpty) {
      setState(() {
        _errorMessage = 'Please enter an email and password';
      });
      return;
    }
    setState(() {
      _isLoading = true;
    });
    try {
      await AuthService().signInWithEmailAndPassword(
        email: _emailController.text,
        password: _passwordController.text,
      );
    } catch (e) {
      setState(() {
        _errorMessage = e.toString();
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _signUp() async {
    if (_emailController.text.isEmpty || _passwordController.text.isEmpty) {
      setState(() {
        _errorMessage = 'Please enter an email and password';
      });
      return;
    }
    setState(() {
      _isLoading = true;
    });
    try {
      await AuthService().signUpWithEmailAndPassword(
        email: _emailController.text,
        password: _passwordController.text,
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _loginWithGoogle() async {
    // await AuthService().signInWithGoogle();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          spacing: 20,
          children: [
            ThemedText(
              text: 'Log in',
              type: ThemedTextType.primary,
              fontSize: Theme.of(context).textTheme.titleLarge?.fontSize,
            ),
            ThemedTextInput(hint: 'Email', controller: _emailController),
            ThemedTextInput(
              hint: 'Password',
              controller: _passwordController,
              obscureText: true,
            ),
            ThemedButton(
              onPressed: _signIn,
              title: 'Log In',
              type: ThemedButtonType.secondary,
            ),
            ThemedText(
              text: '-------- or --------',
              type: ThemedTextType.secondary,
            ),
            Row(
              children: [
                Expanded(
                  child: ThemedButton(
                    onPressed: _signUp,
                    title: 'Sign Up',
                    type: ThemedButtonType.secondary,
                    reversed: true,
                  ),
                ),
                SizedBox(width: 10),
                Expanded(
                  child: ThemedButton(
                    onPressed: _loginWithGoogle,
                    title: 'google',
                    type: ThemedButtonType.secondary,
                    reversed: true,
                  ),
                ),
              ],
            ),
            if (_errorMessage.isNotEmpty)
              ThemedText(text: _errorMessage, type: ThemedTextType.secondary),
          ],
        ),
      ),
    );
  }
}
