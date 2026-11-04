import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';

import '../../../../../core/extensions/localization.dart';
import '../../../../../core/extensions/go_router_extension.dart';
import '../../../../../core/extensions/validation.dart';
import '../../../../../core/utiliity/validation/validation.dart';
import '../../../../../domain/failures/business_failure.dart';
import '../../../../core/failure/business_failure_ui_mapper.dart';
import '../../../../core/router/routes.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/widgets/brand_mark.dart';
import '../../../../core/widgets/text/link_text.dart';
import '../../../../core/widgets/text/typography.dart';
import '../riverpod/registration_provider.dart';

class RegistrationPage extends ConsumerStatefulWidget {
  const RegistrationPage({super.key});

  @override
  ConsumerState<RegistrationPage> createState() => _RegistrationPageState();
}

class _RegistrationPageState extends ConsumerState<RegistrationPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  bool _isPasswordVisible = false;
  bool _isConfirmPasswordVisible = false;

  void _togglePasswordVisibility() {
    setState(() {
      _isPasswordVisible = !_isPasswordVisible;
    });
  }

  void _toggleConfirmPasswordVisibility() {
    setState(() {
      _isConfirmPasswordVisible = !_isConfirmPasswordVisible;
    });
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    ref.listen(registrationProvider, (_, next) {
      if (next case AsyncError(:final error)) {
        final message = error is BusinessFailure
            ? BusinessFailureUIMapper.map(error, context.locale).message
            : context.locale.registerFailed;
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text(message)));
      }
    });
    final isLoading = ref.watch(registrationProvider).isLoading;
    return Scaffold(
      appBar: AppBar(title: HeadingLevel3Text(context.locale.signUp)),
      body: SingleChildScrollView(
        padding: EdgeInsets.symmetric(horizontal: context.dimensions.space.s16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Gap(context.dimensions.space.s80),
              BrandMark(size: context.dimensions.layout.logoSmall),
              Gap(context.dimensions.space.s80),
              TextFormField(
                controller: _nameController,
                textCapitalization: TextCapitalization.words,
                autofillHints: const [AutofillHints.name],
                validator: context.validator.apply([RequiredValidation()]),
                decoration: InputDecoration(hintText: context.locale.fullName),
              ),
              Gap(context.dimensions.space.s16),
              TextFormField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                autofillHints: const [AutofillHints.email],
                validator: context.validator.apply([RequiredValidation()]),
                decoration: InputDecoration(hintText: context.locale.email),
              ),
              Gap(context.dimensions.space.s16),
              TextFormField(
                autovalidateMode: AutovalidateMode.onUserInteraction,
                controller: _passwordController,
                obscureText: !_isPasswordVisible,
                decoration: InputDecoration(
                  hintText: context.locale.password,
                  suffixIcon: GestureDetector(
                    onTap: _togglePasswordVisibility,
                    child: Icon(
                      _isPasswordVisible
                          ? Icons.visibility_outlined
                          : Icons.visibility_off_outlined,
                    ),
                  ),
                ),
                validator: context.validator.apply([
                  RequiredValidation(),
                  PasswordValidation(minLength: 8),
                ]),
              ),
              Gap(context.dimensions.space.s16),
              TextFormField(
                autovalidateMode: AutovalidateMode.onUserInteraction,
                controller: _confirmPasswordController,
                obscureText: !_isConfirmPasswordVisible,
                decoration: InputDecoration(
                  hintText: context.locale.confirmPassword,
                  suffixIcon: GestureDetector(
                    onTap: _toggleConfirmPasswordVisibility,
                    child: Icon(
                      _isConfirmPasswordVisible
                          ? Icons.visibility_outlined
                          : Icons.visibility_off_outlined,
                    ),
                  ),
                ),
                validator: context.validator.apply([
                  RequiredValidation(),
                  ConfirmPasswordValidation(
                    password: () => _passwordController.text,
                  ),
                ]),
              ),
              Gap(context.dimensions.space.s32),
              FilledButton(
                onPressed: isLoading
                    ? null
                    : () {
                        if (!_formKey.currentState!.validate()) return;
                        ref
                            .read(registrationProvider.notifier)
                            .register(
                              fullName: _nameController.text,
                              email: _emailController.text,
                              password: _passwordController.text,
                            );
                      },
                child: isLoading
                    ? SizedBox.square(
                        dimension: context.dimensions.size.iconMedium,
                        child: CircularProgressIndicator(
                          strokeWidth: context.dimensions.border.md,
                        ),
                      )
                    : Text(context.locale.continueAction),
              ),
              LinkText(
                text: context.locale.alreadyHaveAccount,
                linkText: context.locale.signIn,
                onTap: () {
                  context.pushNamedAndRemoveUntil(Routes.login.name);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
