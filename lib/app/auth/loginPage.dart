import 'package:flutter/material.dart';
import 'package:learningtrail/components/themedButton.dart';
import 'package:learningtrail/components/themedText.dart';
import 'package:learningtrail/components/themedTextInput.dart';
import 'package:learningtrail/app/auth/signupPage.dart';
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

  void _navigateToSignup() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SignupPage()),
    );
  }

  Future<void> _loginWithGoogle() async {
    await AuthService().signInWithGoogle();
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
            SizedBox(),
            ThemedTextInput(
              hint: 'Email',
              controller: _emailController,
              autofillHints: [AutofillHints.email],
            ),
            ThemedTextInput(
              hint: 'Password',
              controller: _passwordController,
              obscureText: true,
              autofillHints: [AutofillHints.password],
            ),
            ThemedButton(
              onPressed: _signIn,
              title: 'Log In',
              type: ThemedButtonType.secondary,
            ),
            Row(
              children: [
                Expanded(
                  child: Divider(
                    color: Theme.of(
                      context,
                    ).colorScheme.onSurfaceVariant.withAlpha(50),
                    thickness: 2,
                  ),
                ),
                ThemedText(
                  text: '  OR  ',
                  type: ThemedTextType.secondary,
                  fontSize: 16,
                ),
                Expanded(
                  child: Divider(
                    color: Theme.of(
                      context,
                    ).colorScheme.onSurfaceVariant.withAlpha(50),
                    thickness: 2,
                  ),
                ),
              ],
            ),
            Row(
              children: [
                Expanded(
                  child: ThemedButton(
                    onPressed: _navigateToSignup,
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
              ThemedText(
                text: _errorMessage,
                type: ThemedTextType.secondary,
                fontSize: 16,
              ),
          ],
        ),
      ),
    );
  }
}
