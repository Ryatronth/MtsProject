package com.example.backend.service;

import com.example.backend.entity.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
    private final String SECRET_KEY;
    private final long ACCESS_EXPIRED;
    private final long REFRESH_EXPIRED;

    public JwtService(@Value("${jwt.secret-key.access}") String SECRET_KEY,
                      @Value("${jwt.expire.access}") long ACCESS_EXPIRED,
                      @Value("${jwt.expire.refresh}") long REFRESH_EXPIRED) {
        this.SECRET_KEY = SECRET_KEY;
        this.ACCESS_EXPIRED = ACCESS_EXPIRED;
        this.REFRESH_EXPIRED = REFRESH_EXPIRED;
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public  <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateAccessToken(User userDetails) {
        return generateToken(userDetails, ACCESS_EXPIRED);
    }

    public String generateRefreshToken(User userDetails) {
        return generateToken(userDetails, REFRESH_EXPIRED);
    }

    private String generateToken(User userDetails, long expired) {
        return Jwts
                .builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expired))
                .signWith(getSignIngKey(), SignatureAlgorithm.HS256)
                .claim("id", userDetails.getId())
                .claim("role", userDetails.getRole())
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignIngKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignIngKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
