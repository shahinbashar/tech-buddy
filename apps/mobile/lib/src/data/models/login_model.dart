import 'package:dart_mappable/dart_mappable.dart';

part 'login_model.mapper.dart';

@MappableClass(generateMethods: GenerateMethods.decode)
class UserModel with UserModelMappable {
  UserModel({
    required this.id,
    required this.email,
    required this.fullName,
    required this.role,
    required this.hasPremium,
    this.phone,
  });

  final String id;
  final String email;
  final String fullName;
  final String? phone;
  final String role;
  final bool hasPremium;

  static const fromJson = UserModelMapper.fromJson;
}

/// `POST /auth/mobile/login|register` response.
@MappableClass(generateMethods: GenerateMethods.decode)
class LoginResponseModel with LoginResponseModelMappable {
  LoginResponseModel({
    required this.user,
    required this.accessToken,
    required this.refreshToken,
  });

  final UserModel user;
  final String accessToken;
  final String refreshToken;

  static const fromJson = LoginResponseModelMapper.fromJson;
}

@MappableClass(generateMethods: GenerateMethods.encode)
class LoginRequestModel with LoginRequestModelMappable {
  LoginRequestModel({required this.email, required this.password});

  final String email;
  final String password;
}

@MappableClass(generateMethods: GenerateMethods.encode)
class RegisterRequestModel with RegisterRequestModelMappable {
  RegisterRequestModel({
    required this.fullName,
    required this.email,
    required this.password,
  });

  final String fullName;
  final String email;
  final String password;
}
