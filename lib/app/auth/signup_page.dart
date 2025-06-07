import 'package:flutter/material.dart';
import 'package:learningtrail/components/themed_button.dart';
import 'package:learningtrail/components/themed_text.dart';
import 'package:learningtrail/components/themed_textinput.dart';
import 'package:learningtrail/app/entry_page.dart';
import 'package:learningtrail/services/auth_service.dart';

class SignupPage extends StatefulWidget {
  const SignupPage({super.key});

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  String _errorMessage = '';
  bool _isLoading = false;

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
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => Entrypage()),
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

  Future<void> _loginWithGoogle() async {
    bool success = await AuthService().signInWithGoogle();
    if (success) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => Entrypage()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          spacing: 20,
          children: [
            ThemedText(
              text: 'Create your profile',
              type: ThemedTextType.primary,
            ),
            SizedBox.shrink(),
            ThemedTextInput(
              controller: _emailController,
              hint: 'Email',
              autofillHints: [AutofillHints.email],
            ),
            ThemedTextInput(
              controller: _passwordController,
              hint: 'Password',
              autofillHints: [AutofillHints.password],
            ),
            ThemedButton(
              onPressed: _signUp,
              title: 'Create Account',
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

            ThemedButton(
              onPressed: _loginWithGoogle,
              title: 'Sign up with Google',
              type: ThemedButtonType.secondary,
              reversed: true,
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
