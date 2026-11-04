import '../../domain/entities/login_entity.dart';
import '../models/login_model.dart';

/// Crosses the model ↔ entity seam for auth. Tokens are deliberately
/// dropped: the repository persists them through `TokenManager`, and they
/// never reach the domain layer.
class LoginMapper {
  const LoginMapper();

  UserEntity toEntity(UserModel model) {
    return UserEntity(
      id: model.id,
      email: model.email,
      fullName: model.fullName.trim(),
      phone: model.phone,
      isAdmin: model.role == 'ADMIN',
      hasPremium: model.hasPremium,
    );
  }
}
