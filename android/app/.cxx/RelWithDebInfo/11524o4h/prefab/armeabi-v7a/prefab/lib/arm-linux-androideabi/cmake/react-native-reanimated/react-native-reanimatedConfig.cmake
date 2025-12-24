if(NOT TARGET react-native-reanimated::reanimated)
add_library(react-native-reanimated::reanimated SHARED IMPORTED)
set_target_properties(react-native-reanimated::reanimated PROPERTIES
    IMPORTED_LOCATION "/Users/rajanmalakar/Downloads/nextGen/NextGen/node_modules/react-native-reanimated/android/build/intermediates/cxx/RelWithDebInfo/3v3n1p1o/obj/armeabi-v7a/libreanimated.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/rajanmalakar/Downloads/nextGen/NextGen/node_modules/react-native-reanimated/android/build/prefab-headers/reanimated"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

